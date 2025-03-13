export default function Serverpage(){
    return (
        <>
        <p>database url: {process.env.DATABASE_URL}</p>
        <p>direct url: {process.env.DIRECT_URL}</p>
        </>
    )
}