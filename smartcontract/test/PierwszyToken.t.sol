// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {PierwszyToken} from "../src/PierwszyToken.sol";

contract PierwszyTokenTest is Test {
    PierwszyToken public token;
    address public owner;

    function setUp() public {
        token = new PierwszyToken();
        owner = address(this);
    }

    function testInitialSupplyCorrect() public {
        console2.log("Total Supply: ", token.totalSupply());
        assertEq(token.totalSupply(), 100 * 10 ** token.decimals());
    }

    function testCanMint() public {
        token.mint(owner, 200);
        assertEq(token.balanceOf(owner), 100e18 + 200);
    }

    function testTransferCorrect() public {
        token.mint(msg.sender, 150);
        token.transfer(address(2), 150);
    }

    function testFailTransferNotEnoughFunds() public {
        vm.startPrank(address(2));
        token.mint(msg.sender, 150);
        token.transfer(address(2), 250);
        vm.stopPrank();
    }

    function testFailTransferNotOwnTokens() public {
        token.mint(msg.sender, 150);
        address tokenOwner = msg.sender;
        vm.prank(address(2));
        token.transferFrom(tokenOwner, address(2), 100);
    }

    function testTransferNotOwnTokensButApproved() public {
        token.approve(address(2), 150);
        vm.prank(address(2));
        token.transferFrom(owner, address(2), 100);
    }

    function testPauseOwner() public {
        token.pause();
    }

    function testFailPauseNotOwner() public {
        vm.prank(address(1));
        token.pause();
    }

    function testPauseNotOwner2() public {
        vm.expectRevert();
        vm.prank(address(1));
        token.pause();
    }

    function testSetOwner() public {
        token.transferOwnership(address(1));
        assertEq(token.owner(), address(1));
    }
}
