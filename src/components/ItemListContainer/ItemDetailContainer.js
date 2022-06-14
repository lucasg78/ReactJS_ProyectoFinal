import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { pedirDatos } from "../../mock/pedirDatos"
import { useParams } from "react-router-dom"
import ItemDetail from "./ItemDetail";

export const ItemDetailContainer = () => {

    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)

        pedirDatos()
            .then((resp) => {
                setItem(resp.find((item) => item.id === Number(itemId)))
            })
            .catch((error) => {
                console.error('Error', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <section>

            {
                loading
                    ? <Spinner animation="grow" variant="secondary" className="spinner">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>

                    : <ItemDetail item={item} />
            }

        </section>
    )
}