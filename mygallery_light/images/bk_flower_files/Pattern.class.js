var Pattern = new Class.create({
	initialize: function(_args,_mode) {
		this._colorSquareOrder				= [0,1,2,3,4];
		this._currentlySelectedHex			= false;
		this._colorSquareIDHexs				= ["","","","",""];
		this._numColorSquares				= 5;
		this._currentColorSquareIndex		= 0;
		this._mode							= "";
		this._isValid						= false;
		this._timeouts						= {_updatePattern: 0};
		this._hasSubmitted					= false;
		this._patternColorsAreBeingDrug		= false;
		this._patternDefinitionID			= 0;
		this._patternPreviewDomain			= "http://www.colourlovers.com";
		this._lastRefreshState				= "";
		this._numPatternDefinitionColors	= 0;
		this._updatePatternColorTitles		= true;
		this.hideColorControls				= false;

		this._mode = ((["add","mod","save"].indexOf(_mode) !== -1) ? _mode : "");
		if (this._mode === "") {
			alert("Invalid _mode, exiting.");
			return false;
		}

		if (_args !== undefined) {
			_args = _args.evalJSON(true);

			// Verify _args._colorSquareIDHexs - we want 5 valid hex values || blank strings
			if (Object.isArray(_args._colorSquareIDHexs) && isWithinRange(_args._colorSquareIDHexs.length,0,this._numColorSquares)) {
				for (var _i=0;_i<this._numColorSquares;_i++) {
					if (_args._colorSquareIDHexs[_i] === "") {
						continue;
					}
					if ((_args._colorSquareIDHexs[_i] === undefined) || (isValidHex(_args._colorSquareIDHexs[_i]) === false)) {
						_args._colorSquareIDHexs[_i] = "";
					}
					this.setColorSquareIndex(_args._colorSquareIDHexs[_i],_i);
				}
			}

			this._patternDefinitionID			= parseInt(_args._patternDefinitionID,10);
			this._numPatternDefinitionColors	= _args._numPatternDefinitionColors;

			if (_args.hideColorControls !== undefined) {
				this.hideColorControls = _args.hideColorControls;
			}
		}

		if (this._mode === "add") {
			$("add-mod-pattern-form").action = "/op/add/pattern";
		} else if (this._mode === "mod") {
			$("add-mod-pattern-form").action = "/op/mod/pattern";
		} else if (this._mode === "save") {
			$("add-mod-pattern-form").action = "/op/add/pattern/save";
		}

		_ColorPicker.registerCallback("change",this.colorPickerOnChange.bind(this));

		$$("#create-pattern-box-indicator div")[0].style.width = ($("pattern-color-li_" + this._currentColorSquareIndex.toString()).getWidth().toString() + "px");

		this.drawColorsUI();

		// HAVE THE CLCP SHOW UP WHEN THE COLOR BOXES ARE CLICKED
		for (var _i=0;_i<this._numColorSquares;_i++) {
			Event.observe("pattern-color-li_" + _i.toString(),"mouseup",function(_event) {
				this._currentColorSquareIndex	= getNumericIDFromElementID(Event.element(_event).id);
				var _cumulativeOffset			= $("pattern-preview-div").cumulativeOffset();
				var _element					= $("pattern-color-li_" + this._currentColorSquareIndex.toString());
				var _leftNeighborElement		= _element.previous();
				var _width						= _element.getWidth();
				var _marginLeft					= 0;

				if ((_leftNeighborElement !== null) && (_leftNeighborElement !== undefined)) {
					_marginLeft = (_leftNeighborElement.cumulativeOffset().left - $("pattern-colors").cumulativeOffset().left + _leftNeighborElement.getWidth() + 5); // 5 is for margin-right
				}

				_ColorPicker.setColor("hex",this._colorSquareIDHexs[this._currentColorSquareIndex]);
				if (_ColorPicker._status !== "visible") {
					_ColorPicker.show((_cumulativeOffset.left + 270),(_cumulativeOffset.top - 16));
				}

				new Effect.Morph($$("#create-pattern-box-indicator div")[0],{
					style:		("margin-left: " + _marginLeft.toString() + "px; width: " + (_width.toString() + "px")),
					duration:	0.4,
					transition:	Effect.Transitions.easeOutQuint
				});
			}.bind(this));
			Event.observe("pattern-color-li_" + _i.toString(),"mousedown",function(_event) {
				this._patternColorsAreBeingDrug = false;
			}.bind(this));
		}

		// MAKE THE COLORS SORTABLE
		Sortable.create("pattern-colors",{
			constraint:	true,
			zindex:		8,
			onChange:	function() {
				this._patternColorsAreBeingDrug = true;

				this._colorSquareOrder = Sortable.sequence("pattern-colors").collect(function(_value) {
					return parseInt(_value,10);
				});

				this.updateColorSquares(true);
			}.bind(this),
			onUpdate: function() {
				this._timeouts._updatePattern = this.refreshPattern();
			}.bind(this)
		});

		this.updateColorSquares(true);
		this._lastRefreshState = this.getColorSquaresInOrder().toString();

		Event.observe("add-mod-pattern-form","submit",function(_event) {
			if ((this._isValid === false) && (this._hasSubmitted === false)) {
				if ($("patternTitle").value.stripLowerASCII().strip() === "") {
					alert("Please give this pattern a name.");
					$("patternTitle").activate();
				} else {
					var _colorHexsInOrder = this.getColorSquaresInOrder(), _patternColorHexTitles = {};

					for (var _i=0;_i<this._numColorSquares;_i++) {
						if ($('color-title_' + _i.toString()) !== null) {
							_patternColorHexTitles[_colorHexsInOrder[_i]] = $("color-title_" + _i.toString()).value.stripLowerASCII().strip();
						} else {
							_patternColorHexTitles[_colorHexsInOrder[_i]] = '';
						}
					}

					$("patternData").value = Object.toJSON({
						"patternColorHexs":		_colorHexsInOrder,
						"patternColorTitles":	_patternColorHexTitles,
						"patternDefinitionID":	this._patternDefinitionID
					});

					var _hexs				= this.getColorSquaresInOrder().without("");
					var _unusedColors		= this.getUnusedColors();
					var _numUnusedColors	= _hexs.length;

					for (var _i=0;_i<_numUnusedColors;_i++) {
						_hexs = _hexs.without(_unusedColors[_i]);
					}

					new Ajax.Request("/ajax/return-unclaimed-colors",{
						sanitizeJSON:	true,
						method:			"post",
						asynchronous:	false, // This makes it all possible :-) Require JS execution to wait for this Sjax call to finish.
						parameters:		"colorHexs=" + encodeURIComponent(Object.toJSON(_hexs)),
						onSuccess:		function(_transport) {
							var _unclaimedColors = _transport.responseJSON, _currentNewColorNames = ["","","","",""], _colorHexsInOrder = this.getColorSquaresInOrder(), _patternColorTitles = [], _patternColorHexTitles = {};

							if (_unclaimedColors === undefined) {
								alert("We're sorry but there was an error. Please contact us with the following message enclosed:\n\nPatterns: Return Unclaimed Colors, Bad Response. _mode: " + this._mode);
								return false;
							}

							// Hide these...
							for (var _i=0;_i<this._numColorSquares;_i++) {
								if ($('color-title_' + _i.toString()) !== null) {
									$("new-color-div_" + _i.toString()).hide();
									_patternColorHexTitles[_colorHexsInOrder[_i]] = _patternColorTitles[this._colorSquareOrder[_i]] = $("color-title_" + _i.toString()).value.stripLowerASCII().strip();
									if (_patternColorTitles[this._colorSquareOrder[_i]] !== "") {
										_unclaimedColors = _unclaimedColors.without(_colorHexsInOrder[_i]);
									}
								}
							}

							if (_unclaimedColors.length !== 0) {
								var _body		= '';
								var _firstIndex	= false;
								var _index		= 0;

								if ($("new-color-container") === null) {
									_body += "<p style=\"margin-bottom: 20px;\">Way to go! You found colors that haven't been named yet. Claim these colors by naming them now.</p>";
									_body += '<div id="new-color-container" class="wide-form-container">';

									_body += "<div class=\"col-105\">";
										_body += "<strong>Color</strong>";
									_body += "</div>";
									_body += "<div class=\"col-215\" style=\"margin-right: 0;\">";
										_body += "<strong>Name</strong>";
									_body += "</div>";
									_body += "<div class=\"clear\"></div>";

									for (var _i=0;_i<this._numColorSquares;_i++) {
										_body += "<div id=\"new-color-div_"+_i+"\" style=\"display: none; width: 364px; overflow: hidden;\">";
											_body += "<div class=\"col-105\">";
												_body += "<label for=\"color-title_"+_i+"\" id=\"new-color-label_"+_i+"\" style=\"height: 28px; width: 95px;\"></label>";
											_body += "</div>";
											_body += "<div class=\"col-215\" style=\"margin-right: 0;\">";
												_body += "<div class=\" label-overlay\">";
													_body += "<label for=\"color-title_"+_i+"\">Name this color</label>";
													_body += "<input type=\"text\" id=\"color-title_"+_i+"\" class=\"color-title text-skinny\" maxlength=\"20\" style=\" margin-bottom: 10px;\" />";
												_body += "</div>";
											_body += "</div>";
											_body += "<div class=\"clear\"></div>";
										_body += "</div>";
									}
									_body += '</div>';

									window._ModalWindow = new ModalWindow(Object.toJSON({
										title: 'Name Colors',
										body: _body,
										btns: [
											{title: 'Cancel', closeModal: true, onClick: "$$('input.color-title').each(function(a){a.setValue('');a.previous('label').show();});"},
											{title: 'Name Colors', bold: true, onClick: "$('"+this._mode+"-pattern-btn').click(); return false;"}
										],
										width: 364
									}));

									window._ModalWindow.show();
								} else {
									// Show but don't recreate the modal
									window._ModalWindow.show(false);
								}

								for (var _i=0;_i<this._numColorSquares;_i++) {
									// If this index [_i] isn't set, skip it
									if (_unclaimedColors.indexOf(_colorHexsInOrder[_i]) !== -1) {
										var _index = _colorHexsInOrder.indexOf(_colorHexsInOrder[_i].toUpperCase()); // does this make sense?

										if (_firstIndex === false) {
											_firstIndex = _index;
										}

										$("new-color-div_" + _index.toString()).show();
										$("new-color-label_" + _index.toString()).style.backgroundColor = ("#" + _colorHexsInOrder[_i]);
									}
								}

								$$('div.label-overlay label').each(function(label) {
									label.observe('click', function() {
										this.hide();
									}.bind(label));
								});
								$$('div.label-overlay input').each(function(input) {
									input.observe('focus', function() {
										this.previous('label').hide();
									}.bind(input));
									input.observe('blur', function() {
										if (this.value === '') {
											this.previous('label').show();
										}
									}.bind(input));
								});

								if (_firstIndex !== false) {
									$("color-title_" + _firstIndex.toString()).activate();
								}
							} else {
								if (window._ModalWindow !== undefined) {
									window._ModalWindow.hide();
								}

								if (this._patternDefinitionID !== null) {
									this._isValid = true;
								}
							}
						}.bind(this)
					});
				}
			}

			// Check this._isValid === false again to see if it was successful
			// OR
			// If the pattern has been submitted, don't allow it to re-submit
			if ((this._isValid === false) || this._hasSubmitted) {
				Event.stop(_event);
			} else {
				this._hasSubmitted = true;
			}
		}.bind(this));

		// Save this user's session from the gc...
		new PeriodicalExecuter(function() {
			buildAjaxRequest("echo");
		},60);
	},

	// Returns the colors which are "Not used in this Pattern"
	getUnusedColors: function() {
		return this.getColorSquaresInOrder().slice(this._numPatternDefinitionColors);
	},

	saveForLater: function() {
		$("addPatternBtn").click();
	},

	colorPickerOnChange: function(_colorPickerData) {
		this.updateCurrentColorSquareIndex(_colorPickerData._hex);
	},

	getColorSquaresInOrder: function() {
		var _colorSquareIDHexsOrdered = [];
		for (var _i=0;_i<this._numColorSquares;_i++) {
			_colorSquareIDHexsOrdered[_i] = this._colorSquareIDHexs[this._colorSquareOrder[_i]].toUpperCase();
		}
		return _colorSquareIDHexsOrdered;
	},

	updateColorSquares: function(_updatePatternColorTitles) {
		var _element = "";

		for (var _i=0;_i<this._numColorSquares;_i++) {
			_element = $("pattern-color-li_" + _i.toString());

			if (_i < this._numPatternDefinitionColors) {
				// UPDATE BACKGROUND COLORS
				if (isValidHex(this._colorSquareIDHexs[_i])) {
					_element.style.backgroundColor = ("#" + this._colorSquareIDHexs[_i]);
				}
				_element.show();
			} else {
				_element.hide();
			}
		}
	},

	setColorSquareIndex: function(_hex,_index) {
		if (isWithinRange(this._currentColorSquareIndex,0,(this._numColorSquares - 1)) && (isValidHex(_hex) || (_hex === ""))) {
			this._colorSquareIDHexs[_index] = _hex;
		}
	},

	updateCurrentColorSquareIndex: function(_hex) {
		this.setColorSquareIndex(_hex,this._currentColorSquareIndex);
		this.updateColorSquares(false);
		this.refreshPattern();
	},

	searchPatternDefinitionCategories: function() {
		buildAjaxUpdaterRequest("pattern-definition-category-search-response",$("pattern-definition-category-id").value + "/" + $("pattern-definition-category-order-by").value,1,Object.toJSON({"query": $("pattern-definition-search-query").value.strip()}));
	},

	refreshPattern: function() {
		// Don't update this if we don't have to:
		if (this._lastRefreshState !== this.getColorSquaresInOrder().toString()) {
			clearTimeout(this._timeouts._updatePattern);
			this._timeouts._updatePattern = this.refreshPatternLiaison.bind(this).delay(1);
			this._lastRefreshState = this.getColorSquaresInOrder().toString();
		}
	},

	refreshPatternLiaison: function() {
		$("pattern-preview-div").style.backgroundImage = "url(" + this._patternPreviewDomain + "/patternPreview/" + this._patternDefinitionID + "/" + this.getColorSquaresInOrder().join("/") + ".png)";
	},

	drawColorsUI: function() {
		if (this.hideColorControls) {
			$("hide-pattern-colors-overlay").show();
			$$("#create-pattern-box-indicator div")[0].hide();
		} else {
			if ($("hide-pattern-colors-overlay") !== null) {
				$("hide-pattern-colors-overlay").hide();
			}
			$$("#create-pattern-box-indicator div")[0].show();
		}
	},

	setPatternDefinition: function(_patternDefinitionID,_numColors,canUse) {
		this.hideColorControls = false;
		this.drawColorsUI();

		_patternDefinitionID = parseInt(_patternDefinitionID,10);
		if ((_patternDefinitionID === 0) || isNaN(_patternDefinitionID)) {
			alert("Whoops! We couldn't load that pattern template for you.");
			return;
		}

		if (canUse === false) {
			alert("Whoops! The Template you selected is not available for coloring due to license restrictions.");
			return;
		}

		if (_patternDefinitionID !== this._patternDefinitionID) {
			this._patternDefinitionID			= _patternDefinitionID;
			this._numPatternDefinitionColors	= parseInt(_numColors,10);
			clearTimeout(this._timeouts._updatePattern);

			this.updateColorSquares(true);

			// Avoid the last refresh state check:
			this._timeouts._updatePattern = this.refreshPatternLiaison.bind(this).delay(1);
		}
	}
});