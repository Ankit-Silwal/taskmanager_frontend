import api from "../utils/axiosInstance";

export default function Dashboard() {

  const testAPI = () => {
    console.log("BUTTON CLICKED");
    api.get("/todo/getall")
      .then(res => console.log("API Response:", res.data))
      .catch(err => console.log("API Error:", err));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={testAPI}>
        Test API
      </button>
    </div>
  );
}
