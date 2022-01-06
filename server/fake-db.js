const Product = require("./model/product")

class FakeDB {

    constructor(){
        this.products = [
            {
                name: "Phone XL",
                price: 799,
                description: "A lerge phone with one of the best screens",
                heding1: "サンプルテキスト1",
                heding2: "サンプルテキスト2",
                heding3: "サンプルテキスト3",
                hedingtext1: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                hedingtext2: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                hedingtext3: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                image: "phone-cover1.jpg",
            },
            {
                name: "Phone Mini",
                price: 699,
                description: "A great phone with one of the best cameras",
                heding1: "サンプルテキスト1",
                heding2: "サンプルテキスト2",
                heding3: "サンプルテキスト3",
                hedingtext1: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                hedingtext2: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                hedingtext3: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                image: "phone-cover2.jpg",
            },
            {
                name: "Phone Standard",
                price: 299,
                description: "",
                heding1: "サンプルテキスト1",
                heding2: "サンプルテキスト2",
                heding3: "サンプルテキスト3",
                hedingtext1: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                hedingtext2: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                hedingtext3: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                image: "phone-cover3.jpg",
            },
            {
                name: "Phone Special",
                price: 999,
                description: "ああああああああああああああああ",
                heding1: "サンプルテキスト1",
                heding2: "サンプルテキスト2",
                heding3: "サンプルテキスト3",
                hedingtext1: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                hedingtext2: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                hedingtext3: "サンプルテキスト　サンプルテキスト　サンプルテキスト　サンプルテキスト",
                image: "phone-cover4.jpg",
            }
        ]
    }

    async initDB() {
        await this.clearDB()
        this.pushProductsToDB()
    }

    async clearDB(){
        await Product.deleteMany({})
    }

    pushProductsToDB(){
        this.products.forEach(
            (product) => {
                const newProduct = new Product(product)
                newProduct.save()
            }
        )
    }
}

module.exports = FakeDB