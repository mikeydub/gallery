const IMAGE_NFT = {
  id: '45123412',
  name: 'Meebit #1518',
  platformName: 'SuperRare',
  ownerName: 'Fabric Softener',
  imageUrl:
    'https://lh3.googleusercontent.com/Rg_zPt7X0HkBPGicT_cEnnLJi6OCCsYrs2-juACYdB3s264BP0_KiDVq9r7qkZJ2JenbIxbzMGUsbPqp19belWoFYPOuqZwCVgDStLY',
  imagePreviewUrl:
    'https://lh3.googleusercontent.com/Rg_zPt7X0HkBPGicT_cEnnLJi6OCCsYrs2-juACYdB3s264BP0_KiDVq9r7qkZJ2JenbIxbzMGUsbPqp19belWoFYPOuqZwCVgDStLY=s250',
  description: 'Meebit #1518',
};

const VIDEO_NFT = {
  id: '14214123',
  name: 'old gods | hound 0002',
  platformName: 'SuperRare',
  ownerName: 'Fabric Softener',
  imageUrl:
    'https://lh3.googleusercontent.com/GALUaOkuWm9YRaRvNZjnheAYISJ_xkAEJ11UtYUL5TXPuKPPlhp9xhOe4y8gFYYEBn6G49WQq1AsSndwrIOzwhEUnkxIm-CqzJhHoQ',
  imagePreviewUrl:
    'https://lh3.googleusercontent.com/GALUaOkuWm9YRaRvNZjnheAYISJ_xkAEJ11UtYUL5TXPuKPPlhp9xhOe4y8gFYYEBn6G49WQq1AsSndwrIOzwhEUnkxIm-CqzJhHoQ=s250',
  animationUrl:
    'https://storage.opensea.io/files/9f23092e570255e42931fd375495ae7d.mp4',
  description: 'digital mixed media study',
};

const AUDIO_NFT = {
  id: '7389123',
  name: 'Circular Silver Edition (Mix: 0000)',
  platformName: 'AsyncArt',
  ownerName: 'Fabric Softener',
  imageUrl:
    'https://lh3.googleusercontent.com/8Y4OJ_pMTC0p5r5_83qGsHlTEJA_5543uQNhX_WRQKvlca3s8DqxO_IW1WQu1s0h8pcKVA3xrHX0uAgiMq0PiLbUamjatLQY9c0F',
  imagePreviewUrl:
    'https://lh3.googleusercontent.com/8Y4OJ_pMTC0p5r5_83qGsHlTEJA_5543uQNhX_WRQKvlca3s8DqxO_IW1WQu1s0h8pcKVA3xrHX0uAgiMq0PiLbUamjatLQY9c0F=s250',
  animationUrl:
    'https://storage.opensea.io/files/8bcd860d38d598f4ab224c7cbd2a0890.mp3',
  description:
    'A circular song with no final state. It has a fuzzy quality to it, something warm and inviting but with no clear resolution, kind of like a circle.',
};

const ANIMATION_NFT = {
  id: '4123122',
  name: 'EnergySculpture #331"',
  platformName: 'Art Blocks',
  ownerName: 'Fabric Softener',
  imageUrl:
    'https://lh3.googleusercontent.com/YPh7Eq-kHet0FIE4vb5qBu_3MG-tCzVx1DE53LAGbU_31h66W8kKEJt-f8MfxDtAetHudq62uBcxfn0IYMpWVrZKbZclylGzKrWVCCI',
  imagePreviewUrl:
    'https://lh3.googleusercontent.com/YPh7Eq-kHet0FIE4vb5qBu_3MG-tCzVx1DE53LAGbU_31h66W8kKEJt-f8MfxDtAetHudq62uBcxfn0IYMpWVrZKbZclylGzKrWVCCI=s250',
  animationUrl:
    'https://storage.opensea.io/files/28f7c1a47b9515a8b3aaa686cdcbcb0a.html',
  description:
    'To become an Energy Sculptor, you first have to find your way into MU. Once arrived, an extensive period of trials will test your capabilities for earning the right to be an Energy Sculptor.\n\nThis project is part of The Realm of MU saga. Additional project feature(s) => MotionState: Flow, DelayMode: Slacker, DimensionalBalance: Unstable, ColorBase(0-255): 161',
};

const MOCK_DB = {
  users: [
    {
      id: 'PAoGbFB6OQtZ6mWI/BYyLA==',
      creationTime: Date.now(),
      username: 'dcinvestor',
      displayName: 'DCInvestor',
      description:
        'French Graphic Designer + Digital Artist Sparkles Founder of @healthedeal\nSparkles lorem ipsum sit dolor http://superrare.co/maalavidaa Sparkles Shop\n& More → http://linktr.ee/maalavidaa',
      addresses: ['0xDC25EF3F5B8A186998338A2ADA83795FBA2D6911'],
    },
    {
      id: '418q98213g4aagg512q3',
      creationTime: Date.now(),
      username: 'kaito',
      displayName: 'kaito',
      description: 'i like the nft',
      addresses: ['0xKA25EF3F5B8A186998338A2ADA83795FBA2D69541'],
    },
  ],
  collections: [
    {
      id: '131221902ecenqkdl3122z',
      ownerUserId: 'PAoGbFB6OQtZ6mWI/BYyLA==',
      name: 'My fine collection',
      description: 'This is my sick collection',
      nfts: [
        AUDIO_NFT,
        IMAGE_NFT,
        AUDIO_NFT,
        IMAGE_NFT,
        AUDIO_NFT,
        IMAGE_NFT,
        AUDIO_NFT,
        IMAGE_NFT,
        AUDIO_NFT,
        IMAGE_NFT,
        AUDIO_NFT,
      ],
    },
    {
      id: 'cj1DKLFsd25/21902edsDakdl41sDSa',
      ownerUserId: '418q98213g4aagg512q3',
      name: 'Favorites',
      description: 'Favorites only',
      nfts: [VIDEO_NFT],
    },
    {
      id: 'cjoidj14ljpz3zz98!5ynkff!33',
      ownerUserId: 'PAoGbFB6OQtZ6mWI/BYyLA==',
      name: 'Punks',
      description: 'This is all punks',
      nfts: [ANIMATION_NFT],
    },
  ],
  nfts: [AUDIO_NFT, IMAGE_NFT, ANIMATION_NFT, VIDEO_NFT],
};

module.exports = MOCK_DB;
