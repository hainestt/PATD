#!/bin/sh

str='123456789'
echo ${str:0-3}  				#倒数三个
echo ${str:4}					#从4开始，不包括4
echo ${str:2-3}					#倒数三个从第二个开始，不包括第二个
echo ${str:0-3:1}				#倒数三个，返回1个，这里的1表示长度

url='https://blog.hainest.com/index.html'
echo ${url#*//}					#返回左边删除“//”之前的字符串，尽量短的去匹配
echo ${url%//*}					#返回右边删除"//"之后的字符串，尽量短的去匹配

echo ${newt:-'new str'}			#“newt”未定义或为空,返回"new str",否则返回"newt"
echo ${newt:='new str'}			#同上，不过这里返回"new str"时会赋值给"newt"
echo ${newtt:+"new str"}		#若"newtt"不为空，则返回“new str”，否则返回空值
# echo ${newty:?"new str"}		#若"newty"未定义或为空，将其写入标准错误流，本语句执行失败，会终止后面的语句的执行，否则返回原值

name="haines.tao"
echo ${name/tao/hai}			#返回name变量中第一个"tao"被替换成"hai"之后的字符串
echo ${name//a/c}				#返回name变量中所有的"a"被替换成"c"之后的字符串

echo $(git status)				#返回"git status"命令执行后所输出的结果
echo $(date)

echo $((20*2+2))				#返回双括号内变量表达式计算后的结果

age=21
let age=${age}+1
echo 'age:'${age}

#特殊变量
echo $0							#当前脚本的文件名
echo $num						#num从1开始的数字，$1表示第一个参数${5}表示第5个参数
