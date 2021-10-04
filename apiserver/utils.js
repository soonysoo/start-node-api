//테스트를 진행할 코드
function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports  = {
    capitalize : capitalize
}