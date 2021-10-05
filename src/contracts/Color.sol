// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Color is ERC721, ERC721Enumerable {
  string[] colors;
  mapping(string => bool) _colorExists;

  constructor() ERC721("Color", "CLR") {}

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

  function mint(string memory _color) public {
    // Require unique color
    colors.push(_color);
    uint256 _id = colors.length - 1;
    _safeMint(msg.sender, _id);
    _colorExists[_color] = true;
  }
}
