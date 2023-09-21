import { Form } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite ? "Remove from favorites" : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}

export default function Contact() {
    const [Data, setData] = useState({ first: "", last: "" });
    const contact = {
        first: "Your",
        last: "Name",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        notes: "Some notes",
        favorite: true,
    };
    useEffect(() => {
        async function getInitData() {
            const response = await fetch("/api/getList");
            const jsonRes = await response.json();
            setData(jsonRes[0]);
            console.log(jsonRes[0]);
        }
        getInitData();
    }, []);

    return (
        <div id="contact">
            <div>
                <img key={contact.avatar} src={contact.avatar || null} />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {Data.first} {Data.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a href={`https://twitter.com/${contact.twitter}`}>
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
