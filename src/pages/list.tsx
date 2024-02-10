import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
    userId : number,
    name: string;
    emailId: string;
}

export default function List() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        fetch('https://backend3-mdfb.onrender.com/user/data', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setUsers(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    

    const deleteUser = async (userId: number) => {
        try {
            await axios.delete(`https://backend3-mdfb.onrender.com/user/delete/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            setUsers(users.filter(user => user.userId !== userId));
        } catch (error: any) {
            setError("Error deleting user: " + error.message);
        }
    };
    

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <Button style={{ width: 150 }} variant="contained" onClick={() => router.push("/form")}>
                    Create User
                </Button>

                <Button style={{ width: 150 }} variant="contained" onClick={() => {localStorage.setItem("token", " ");  router.push("/")}}>
                    Logout
                </Button>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
                Click on the Name to Update
            </div>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Email ID</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                <a href={`/user/${user.userId}`}>{user.name}</a>
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>{user.emailId}</td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                <button onClick={async () => await deleteUser(user.userId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
