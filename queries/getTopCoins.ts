export const fetchWatches = async () => {
    const response = await fetch(`https://api.coinranking.com/v2/coins`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };