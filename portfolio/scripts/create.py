import sys
import re
import os.path

total = len(sys.argv)
cmdargs = str(sys.argv)

filename = sys.argv[1]
imagename = sys.argv[2]

print 'Preparing ' + filename

if os.path.isfile(filename):
	# if file exists, open it and do some substitutions
  s=open(filename).read()
  # TODO - find data.js entry and update it
else: 
	# if the file doesn't create it and add contents of newsimple.html
	s=open("newsimple.html").read()
	# TODO - create data.js entry

# also replace the fb image, fb title, and fb desription in meta data
# ideally read from data.js so only update one file
# a separate update meta data file to run after file created so you don't throw out the whole thing
# if no info on the image, make it same name as filename with .png extension
# or create the data.js entry from an input file
# use system date as date
s=re.sub("index.html", "%s" % filename, s)
s=re.sub("index.png", "%s" % imagename, s)
f=open(filename, 'w')
f.write(s)
f.flush()
f.close()