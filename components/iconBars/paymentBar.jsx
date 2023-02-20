import React from "react";
import { FaCcVisa, FaCcMastercard, FaPaypal, FaMoneyBill } from "react-icons/fa";
import { GiBank } from "react-icons/gi";
function PaymentIconsContainer() {
    return (
        <div className="flex items-center space-x-6">
            <FaCcVisa size={24} className="text-black" />
            <FaCcMastercard size={24} className="text-black" />
            <FaPaypal size={24} className="text-black" />
            <GiBank size={24} className="text-black" />
            <FaMoneyBill size={24} className="text-black" />
            {/* Add more icons as needed */}
        </div>
    );
}

export default PaymentIconsContainer;
