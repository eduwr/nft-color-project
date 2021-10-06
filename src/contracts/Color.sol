// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Color is ERC721, ERC721Enumerable {
  string[] public colors;

  mapping(string => bool) _colorExists;

  constructor() ERC721("Color", "CLR") {}

  modifier uniqueColor(string memory _color) {
    require(!_colorExists[_color], "Color should be unique");
    _;
  }

  function getColors() external view returns (string[] memory) {
    return colors;
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function mint(string memory _color) public uniqueColor(_color) {
    colors.push(_color);
    uint256 _id = colors.length - 1;
    _safeMint(msg.sender, _id);
    _colorExists[_color] = true;
  }
}
