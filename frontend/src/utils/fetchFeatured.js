const fetchFeatured = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-featured-products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ page }),
    });

    const result = await response.json();

    if (result?.message === 'Featured products fetched successfully') {
        if (result.data.length === 0) {
            setHasMore(false);
        } else {
            setProducts(prevProducts => [...prevProducts, ...result.data]);
            if (result.data.length < 5) {
                setHasMore(false);
            } else {
                setPage(prevPage => prevPage + 1);
            }
        }
    } else {
        alert('Failed to fetch featured products');
    }
}