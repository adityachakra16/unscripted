// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./StakingToken.sol";

contract LiquidStaking {
    IERC20 public stakingToken;
    StakingToken public rewardToken;
    address public artifactCreator;
    address public artifactOwner;
    uint256 public artifactId;
    uint256 public totalStaked;
    uint256 public totalRewardPool;

    mapping(address => uint256) public stakes;
    mapping(address => uint256) public pendingRewards;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event ArtifactPurchased(address indexed buyer, uint256 price);
    event RewardClaimed(address indexed staker, uint256 amount);

    constructor(address _stakingToken, address _rewardToken, address _artifactCreator, uint256 _artifactId) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = StakingToken(_rewardToken);
        artifactCreator = _artifactCreator;
        artifactId = _artifactId;
        artifactOwner = _artifactCreator;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        totalStaked += amount;
        stakes[msg.sender] += amount;

        rewardToken.mint(msg.sender, amount);

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(stakes[msg.sender] >= amount, "Not enough staked tokens");

        totalStaked -= amount;
        stakes[msg.sender] -= amount;

        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");
        rewardToken.burn(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function buyArtifact(uint256 price) external {
        require(stakingToken.transferFrom(msg.sender, address(this), price), "Purchase failed");

        // Distribute funds
        uint256 creatorShare = (price * 10) / 100;
        uint256 stakersShare = (price * 10) / 100;
        uint256 ownerShare = price - creatorShare - stakersShare;

        require(stakingToken.transfer(artifactCreator, creatorShare), "Creator transfer failed");
        require(stakingToken.transfer(artifactOwner, ownerShare), "Owner transfer failed");

        // Add to total reward pool
        totalRewardPool += stakersShare;

        artifactOwner = msg.sender;
        emit ArtifactPurchased(msg.sender, price);
    }

    function claimReward() external {
        uint256 reward = (stakes[msg.sender] * totalRewardPool) / totalStaked;
        require(reward > 0, "No rewards to claim");

        pendingRewards[msg.sender] += reward;
        totalRewardPool -= reward;

        require(stakingToken.transfer(msg.sender, reward), "Reward transfer failed");
        emit RewardClaimed(msg.sender, reward);
    }
}
