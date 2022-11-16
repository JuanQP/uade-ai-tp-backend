// Gettign the Newly created Mongoose Model we just created
import Product, { ProductDocument } from '../models/Product.model';

// Async function to get the User List
export async function getProducts(query: any, sort: MongoDBSort, page: number, limit: number) {

  // Options setup for the mongoose paginate
  const options = {
    page,
    limit,
    sort,
  }
  // Try Catch the awaited promise to handle the error
  try {
    console.log("Query", query)
    const Products = await Product.paginate(query, options)
    // Return the Userd list that was retured by the mongoose promise
    return Products;

  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e)
    throw Error('Error while Paginating Users');
  }
}

export async function getLatestProducts() {
  try {
    const Products = await Product.find().sort({ $natural: -1 }).limit(4);
    return Products;
  } catch (e) {
    throw Error('Error while retrieving Products');
  }
}

export async function getLatestSonido() {
  // Try Catch the awaited promise to handle the error
  try {
    const Products = await Product.find({ categoria: 'Parlante' }).sort({ $natural: -1 }).limit(4);
    return Products;
  } catch (e) {
    throw Error('Error while retrieving Products');
  }
}

export async function getProductById(id: string) {
  // Try Catch the awaited promise to handle the error
  try {
    const ProductResult = await Product.findById(id);
    return ProductResult;
  } catch (e) {
    throw Error('Error while retrieving Product');
  }
}

export async function deleteProductsById(ids: string[]) {
  // Try Catch the awaited promise to handle the error
  try {
    const ProductResult = await Product.deleteMany({ '_id': { $in: ids } });
    return ProductResult;
  } catch (e) {
    // return a Error message describing the reason
    throw Error('Error while retrieving Product');
  }
}

export async function updateProduct(product: ProductDocument) {
  try {
    const { _id: id } = product
    if(!id) {
      throw new Error("ID must be present")
    }
    //Find the old Product Object by the Id
    const oldProduct = await Product.findById(id);
    if (!oldProduct) {
      throw new Error("No se encontró el producto");
    }
    const savedProduct = await oldProduct.$set({ ...product });
    savedProduct.save();
    return savedProduct;
  } catch (e) {
    throw e
  }
}

export async function createProduct(product: Product) {
  try {
    // Saving the Product
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (e) {
    // return a Error message describing the reason
    throw Error("Error while Creating Product")
  }
}

export async function getFilters() {

  // Try Catch the awaited promise to handle the error
  try {
    const marcas = await Product.distinct('marca');
    const categorias = await Product.distinct('categoria');
    // Return the Userd list that was retured by the mongoose promise
    return {
      marcas,
      categorias,
    };

  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e)
    throw Error('Error while Paginating Users');
  }
}
