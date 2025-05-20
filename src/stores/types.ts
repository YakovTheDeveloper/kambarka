export type Habitat = {
  id: number
  title: 'string'
  name: 'string'
  type: 'string'
  imageFile: 'string'
  image: 'string'
  imageFile1: 'string'
  image1: 'string'
  imageFile2: 'string'
  image2: 'string'
  imageFile3: 'string'
  image3: 'string'
  audio1File: 'string'
  audio1: 'string'
  audio2File: 'string'
  audio2: 'string'
  imageFile15: 'string'
  image15: 'string'
  imageFile16: 'string'
  image16: 'string'
  imageFile17: 'string'
  image17: 'string'
  imageFile18: 'string'
  image18: 'string'
  imageFile19: 'string'
  image19: 'string'
  imageFile20: 'string'
  image20: 'string'
  imageFile21: 'string'
  image21: 'string'
  videoFile: 'string'
  video: 'string'
  imageFile22: 'string'
  image22: 'string'
  imageFile23: 'string'
  image23: 'string'
  imageFile32: 'string'
  image32: 'string'
  imageFile33: 'string'
  image33: 'string'
  imageFile34: 'string'
  image34: 'string'
  blockOne: {
    id: 0
    field1Name: 'string'
    field1Description: 'string'
    field2Name: 'string'
    field2Description: 'string'
    field3Name: 'string'
    field3Description: 'string'
    field4Name: 'string'
    field4Description: 'string'
    field5Name: 'string'
    field5Description: 'string'
    field6Name: 'string'
    field6Description: 'string'
    field7Name: 'string'
    field7Description: 'string'
    field8Name: 'string'
    field8Description: 'string'
    field9Name: 'string'
    field9Description: 'string'
    field10Name: 'string'
    field10Description: 'string'
    habitat: 'string'
  }
  blockTwo: {
    id: 0
    imageFile1: 'string'
    image1: 'string'
    field11Name: 'string'
    field11Description: 'string'
    field12Name: 'string'
    field12Description: 'string'
    field13Name: 'string'
    field13Description: 'string'
    imageFile2: 'string'
    image2: 'string'
    imageFile3: 'string'
    image3: 'string'
    habitat: 'string'
  }
  blockThree: {
    id: 0
    field14Name: 'string'
    field14Description: 'string'
    imageFile15: 'string'
    image15: 'string'
    field15Name: 'string'
    field15Description: 'string'
    imageFile16: 'string'
    image16: 'string'
    field16Name: 'string'
    field16Description: 'string'
    imageFile17: 'string'
    image17: 'string'
    field17Name: 'string'
    field17Description: 'string'
    imageFile18: 'string'
    image18: 'string'
    field18Name: 'string'
    field18Description: 'string'
    imageFile19: 'string'
    image19: 'string'
    field19Name: 'string'
    field19Description: 'string'
    imageFile20: 'string'
    image20: 'string'
    field20Name: 'string'
    field20Description: 'string'
    imageFile21: 'string'
    image21: 'string'
    field21Name: 'string'
    field21Description: 'string'
    videoFile: 'string'
    video: 'string'
    habitat: 'string'
  }
  blockFour: {
    id: 0
    imageFile: 'string'
    image: 'string'
    field22Name: 'string'
    field22Description: 'string'
    audio1Name: 'string'
    audio1File: 'string'
    audio1: 'string'
    audio2Name: 'string'
    audio2File: 'string'
    audio2: 'string'
    habitat: 'string'
  }
  blockFive: {
    id: 0
    imageFile23: 'string'
    image23: 'string'
    field23Name: 'string'
    field23Description: 'string'
    sectionTitle24: 'string'
    field24Name: 'string'
    field24Description: 'string'
    field25Name: 'string'
    field25Description: 'string'
    field26Name: 'string'
    field26Description: 'string'
    field27Name: 'string'
    field27Description: 'string'
    field28Name: 'string'
    field28Description: 'string'
    field29Name: 'string'
    field29Description: 'string'
    field30Name: 'string'
    field30Description: 'string'
    field31Name: 'string'
    field31Description: 'string'
    habitat: 'string'
  }
  blockSix: {
    id: 0
    imageFile32: 'string'
    image32: 'string'
    field32Name: 'string'
    field32Description: 'string'
    imageFile33: 'string'
    image33: 'string'
    field33Name: 'string'
    imageFile34: 'string'
    image34: 'string'
    field34Name: 'string'
    field35Name: 'string'
    field35Description: 'string'
    field36Name: 'string'
    field36Description: 'string'
    field37Name: 'string'
    field37Description: 'string'
    field38Name: 'string'
    field38Description: 'string'
    habitat: 'string'
  }
}

export type Preview = {
  "id": 0,
  "title": string,
  image: string
}


export type Redbook = {
  "id": number,
  "title": string,
  "redBookInfo":
  {
    "id": number,
    "title": string,
    "description": string,
    "redBook": string
  }[]
  ,
  "redBookImages":
  {
    "id": number,
    "imageFile": string,
    "image": string,
    "redBook": string
  }[]

}

export type Memorial = {
  "id": number,
  "title": string,
  "name": string,
  "status": string,
  "place": string,
  "description": string,
  "memorialNatureImages":
  {
    "id": number,
    "imageFile": string,
    "image": string,
    "memorial": string
  }[]
  ,
  "memorialNatureMedia":
  {
    "id": number,
    "mediaFile": string,
    "media": string,
    "memorial": string
  }[]

}

export type MemoryGameData = {
  id: number
  level: string
  memoryImages: {
    id: number
    image: string
  }[]
}
export type Sight = {
  id: number,
  title: string,
  type: string,
  name: string,
  simpleName: string,
  status: string,
  history: string,
  nowadays: string,
  image: {
    id: number,
    image: string
  }[]
}
