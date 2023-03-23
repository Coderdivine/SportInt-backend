class randomNum{
    constructor(){
        return this;
    }
    async randomNum(){
        const random = Math.floor(Math.random() * 900000) + 100000;
        return random.toString();
    };
}
module.exports = new randomNum();