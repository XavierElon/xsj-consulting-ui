interface Product {
    id: string,
    title: string,
    price: number
}

const productsArray: Product[] = [
    {
        id: 'price_1My1KPJrkE18sY2VqKkRfIdN',
        title: 'Achilles',
        price: 5
    },
    {
        id: 'price_1My1LPJrkE18sY2Vkfqx99mJ',
        title: 'Flocka',
        price: 10
    },
    {
        id: 'price_1My1LqJrkE18sY2VBudHbvik',
        title: 'Elon',
        price: 15
    },
    {
        id: 'price_1My1MNJrkE18sY2VeFuO8tjI',
        title: 'XXX',
        price: 50
    },
    {
        id: 'price_1My1MqJrkE18sY2VO1b37LPS',
        title: 'Bezos',
        price: 51
    },
    {
        id: 'price_1My1NNJrkE18sY2VH98CVX45',
        title: 'Musk',
        price: 500
    },
]

const getProductData = (id: string) => {
    let productData = productsArray.find(product => product.id === id)

    if (productData === undefined) {
        console.log('Product data does not exist for ID ' + id)
        return undefined
    }

    return productData
}
 
export { productsArray, getProductData }