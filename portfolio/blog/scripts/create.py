import sys;
import re;

total = len(sys.argv)
cmdargs = str(sys.argv)

filename = sys.argv[1]
imagename = sys.argv[2]

print 'Preparing ' + filename
s=open("newsimple.html").read()
s=re.sub("index.html", "%s" % filename, s)
f=open(filename, 'w')
f.write(s)
f.flush()
f.close()