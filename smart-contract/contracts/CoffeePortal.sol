// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract CoffeePortal {
    uint256 totalCoffee;

    address payable public owner;

    event NewCoffee(
        address indexed from,
        uint256 timestamp,
        string message,
        string name
    );

    constructor() payable {
        owner = payable(msg.sender);
    }

    struct Coffee {
        address giver;
        string message;
        string name;
        uint256 timestamp;
    }

    Coffee[] coffee;

    function getAllCoffee() public view returns (Coffee[] memory) {
        return coffee;
    }

    function getTotalCoffee() public view returns (uint256) {
        return totalCoffee;
    }

    function buyCoffee(
        string memory _message,
        string memory _name,
        uint256 _payAmount
    ) public payable {
        uint256 cost = 0.001 ether;
        require(_payAmount <= cost, "Insufficient Ether provided");

        totalCoffee++;

        coffee.push(Coffee(msg.sender, _message, _name, block.timestamp));

        (bool success, ) = owner.call{value: _payAmount}("");
        require(success, "Failed to send money");

        emit NewCoffee(msg.sender, block.timestamp, _message, _name);
    }
}
