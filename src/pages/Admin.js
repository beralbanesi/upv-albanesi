import './Admin.css'
import AddProductForm from "../components/Admin/AddProductForm";
import AddCategoryForm from "../components/Admin/AddCategoryForm";
import AddRouteForm from "../components/Admin/AddRouteForm";
import ViewContactMessages from '../components/Admin/ViewContactMessages';

const AdminPage = () => {

  return (
    <div className='main-container'>
      <h1>Consola de administracion</h1>
      <div className='leftColumn'>
        <div className='columnElement'>
          <AddProductForm />
        </div>
        <div className='columnElement'>
          <AddCategoryForm />
        </div>
        <div className='columnElement'>
          <AddRouteForm />
        </div>
      </div>
      <div className='rightColumn'>
        <div className='columnElement'>
          <ViewContactMessages />
        </div>
      </div>
    </div>
  )

}
export default AdminPage;