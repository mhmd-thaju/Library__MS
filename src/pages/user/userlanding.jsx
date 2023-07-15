import { useNavigate } from "react-router-dom"
export const Uland = ()=>
{

    const navigate = useNavigate();
    return(
        <div>
            <h1>
                this is user landing page

            </h1>

            <button onClick={()=>{navigate('/uview')}}>View Books</button>
        </div>
    )
}