import styles from "@/app/dashboard/dashboard.module.css"
const Search = () => {
    return (
        <input type="text" placeholder="Enter your search" className={styles.search}/>
    );
}

export default Search;
