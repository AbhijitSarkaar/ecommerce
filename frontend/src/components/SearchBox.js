import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchBox({ history }) {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("keyword", keyword);
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else history.push("/");
    };

    return (
        <Form onSubmit={submitHandler} style={{ display: "flex" }}>
            <Form.Control
                style={{ width: "250px" }}
                type="text"
                name="q"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
                className="mr-sm-2 ml-sm-5"
            ></Form.Control>
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
}
