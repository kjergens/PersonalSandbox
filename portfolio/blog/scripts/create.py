import sys;
import re;

total = len(sys.argv)
cmdargs = str(sys.argv)

filename = sys.argv[1]
imagename = sys.argv[2]

print 'Preparing ' + filename
# only do this part if the file doesn't exist already
s=open("newsimple.html").read()

# also replace the fb image, fb title, and fb desription in meta data
# ideally read from data.js so only update one file
# a separate update meta data file to run after file created so you don't throw out the whole thing
# if no info on the image, make it same name as filename with .png extension
# or create the data.js entry from an input file
s=re.sub("index.html", "%s" % filename, s)
f=open(filename, 'w')
f.write(s)
f.flush()
f.close()