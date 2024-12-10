import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import axios from "axios";

function CostumerList() {

    const { customer, setCustomer } = useState([]);
    const { loading, setLoading } = useState(true);

    useEffect(() => {

    }, []);

    const fetchUser = async () => {
        const response = await axios.get('https://kami-backend-5rs0.onrender.com/customers');
        setCustomer(response.data);
        setLoading(false);
    }

    return {

    }
}

