export default class String{
    static fromPXtoNumber(px){
        if(typeof(px) == "number"){
            return px;
        }else if(px == null){
            return '';
        }

        if(px.substring(px.length-2,px.length) == "px"){
            return px.substring(0,px.length-2);
        }
        return px;
    }

    static fromRGBtoHEX(rgb){
        if(typeof(rgb) == "string"){
            if(rgb.charAt(0) == '#'){
                return rgb;
            }else{
                let numbers = rgb.substring(4,rgb.length-1).split(",");
                let number = '', result = '#';
                numbers.forEach((value) => {
                    number = (Number(value)).toString(16);
                    if(number.length == 1){
                        number = "0"+number;
                    }
                    result += number;
                })
                return result;
            }
        }else{
            return '';
        }
    }

    static fromURLtoString(url){
        return url.substring(5,url.length-2);
    }
}