import React from "react";

const CreateCustomer = () => {
    return (
        <div>
            <h2>Create New Customer</h2>
            <from>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <br />
                <button type="submit">Add Customer</button>
            </from>
        </div>
    );
};

export default CreateCustomer;
