import info from '../info.json';


interface Props {
    title: string;
}
function Header( { title }:Props ) {
    return (
        <>
            <div className="header">
                <h1 className="logo">{ title }</h1>
            </div>
        </>
    );
}
export default Header;