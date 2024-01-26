import axios from "axios";

export const getAllBoards = async () => {
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

export const getBoard = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}board/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching board:", error);
  }
};