// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract LuckyNumber {
    uint256 secretNumber;

    constructor() payable {
        secretNumber = 9;
    }

    event LotteryEvent(bool isWinner, address indexed player);

    function guessNumber(uint256 _number) public payable {
        if (_number != secretNumber) {
            // EVENT
            emit LotteryEvent(false, msg.sender);
        } else {
            // EVENT
            emit LotteryEvent(true, msg.sender);
        }
    }
}
