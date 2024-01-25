import axios from "axios";

export const getBoard = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}board`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  };