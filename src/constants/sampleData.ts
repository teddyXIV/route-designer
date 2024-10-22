import image from "./logos.ts"

interface DummyMapData {
  image: string;
  title: string;
  distance: string;
  elevation: string;
  difficulty: string;
  id: number;
}

const dummyMapData: DummyMapData[] = [
  {
    image: image.map,
    title: "Example 1",
    distance: "Dis1",
    elevation: "Elev1",
    difficulty: "Diff1",
    id: 1
  },
  {
    image: image.map,
    title: "Example 2",
    distance: "Dis2",
    elevation: "Elev2",
    difficulty: "Diff2",
    id: 2
  },
  {
    image: image.map,
    title: "Example 3",
    distance: "Dis3",
    elevation: "Elev3",
    difficulty: "Diff3",
    id: 3
  },
  {
    image: image.map,
    title: "Example 4",
    distance: "Dis4",
    elevation: "Elev4",
    difficulty: "Diff4",
    id: 4
  },
  {
    image: image.map,
    title: "Example 5",
    distance: "Dis5",
    elevation: "Elev5",
    difficulty: "Diff5",
    id: 5
  }
];

export { dummyMapData };