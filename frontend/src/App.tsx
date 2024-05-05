import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function App() {
    const [totalSpect, setTotalSpent] = useState(0);

    useEffect(() => {
        async function fetchTotalAmount() {
            const res = await fetch("/api/v1/expenses/total-spent");
            const data = await res.json();
            setTotalSpent(data.data.totalSpent);
        }
        fetchTotalAmount();
    }, []);

    return (
        <Card className="w-[350px] mx-auto">
            <CardHeader>
                <CardTitle>Total Spent</CardTitle>
                <CardDescription>
                    The total amount you've spent.
                </CardDescription>
            </CardHeader>
            <CardContent>{totalSpect}</CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    );
}

export default App;
