import SupplierList from "./SupplierList";
import ProductList from "./ProductList";

export default function App() {
    return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
            <h1>Meu WebApp Fullstack</h1>
            <SupplierList />
            <p>---------------------------------------------------------</p>
            <ProductList />
        </div>
    )
}