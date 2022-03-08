// 函数注入-injection


const getRandomLetter = () => {
    const min = "A".charCodeAt();
    const max = "Z".charCodeAt();
    
    return String.fromCharCode(
        Math.floor( Math.random() * (1 + max - min) ) + min
    );
}

const getRandomFileName = (fileExtensions = '.js') => {
    const NAME_LENGTH = 12;
    const res = []    
    
    for(let i = 0; i < NAME_LENGTH; i++) {
       res.push(getRandomLetter())
    }

    return res.join('') + fileExtensions
}



// 使用参数注入内部函数

const getRandomFileName2 = (fileExtensions = '.js', randomLetterFunc) => {
    const NAME_LENGTH = 12;
    const res = []    
    
    for(let i = 0; i < NAME_LENGTH; i++) {
        res.push(randomLetterFunc())   
    }
    return res.join('') + fileExtensions
}

let log = console.log


log(getRandomFileName2('.js', getRandomLetter))






