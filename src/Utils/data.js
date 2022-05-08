import db from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

// devuelve las cateogorias desde la BD, ordenadas alfabeticamente
const getCategories = async () => {
  const categoriesCollection = collection(db, 'categorias');
  const catsSnapshot = await getDocs(categoriesCollection);
  const catList = catsSnapshot.docs.map((doc) => {
    let cat = []
    cat.name = doc.data().name;
    cat.id = doc.id;
    return cat
  })
  catList.sort((a, b) => a.name.localeCompare(b.name))
  return catList
}

const getRoutes = async () => {
  const routesCollection = collection(db, 'rutas')
  const routesSnapshot = await getDocs(routesCollection)
  const routesList = routesSnapshot.docs.map((doc) => {
    return doc.data()
  })
  routesList.sort((a, b) => a.position > b.position ? 1 : -1)
  return routesList
}

const getMessages = async () => {
  const msgCollection = collection(db, 'mensajes')
  const msgSnapshot = await getDocs(msgCollection)
  const msgList = msgSnapshot.docs.map((doc) => {
    return doc.data()
  })
  return msgList
}

export { getCategories, getRoutes, getMessages };  