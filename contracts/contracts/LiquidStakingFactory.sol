// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./StakingToken.sol";
import "./LiquidStaking.sol";

contract LiquidStakingFactory {
    IERC20 public baseToken;
    address[] public liquidStakings;
    mapping(uint256 => address) public artifactIdToStaking;

    event LiquidStakingCreated(address indexed stakingAddress, uint256 artifactId);

    constructor(address _baseToken) {
        baseToken = IERC20(_baseToken);
    }

    function createLiquidStaking(address artifactCreator, uint256 artifactId, string memory stakingTokenName, string memory stakingTokenSymbol) external returns (address) {
        require(artifactIdToStaking[artifactId] == address(0), "Artifact ID already used");

        StakingToken newRewardToken = new StakingToken(stakingTokenName, stakingTokenSymbol);
        LiquidStaking newLiquidStaking = new LiquidStaking(
            address(baseToken),
            address(newRewardToken),
            artifactCreator,
            artifactId
        );

        liquidStakings.push(address(newLiquidStaking));
        artifactIdToStaking[artifactId] = address(newLiquidStaking);

        emit LiquidStakingCreated(address(newLiquidStaking), artifactId);
        
        return address(newLiquidStaking);
    }

    function getLiquidStakings() external view returns (address[] memory) {
        return liquidStakings;
    }
}
