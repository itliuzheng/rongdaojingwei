//验证电话号码
export function regPhone(str) {
	return (/^1[34578]\d{9}$/.test(str))
}
//验证6-15字母数字
export function regPass(str) {
	let reg = /^[A-Za-z0-9]{6,15}$/;
	return (reg.test(str))
}

//验证非空
export function noEmpty(str){
	return (str.length > 0 && str)
}

//验证邮箱
export function regEmail(str){
	return (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(str))
}

//验证带小数点数字
export function regNumPoint(str){
	return (/^\d+(?=\.{0,1}\d+$|$)/.test(str))
}