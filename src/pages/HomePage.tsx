import InfluencerSearch from "../components/organisms/InfluencerSearch";

const HomePage = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Influencer chat</h1>
      <InfluencerSearch />
    </div>
  );
};

export default HomePage;
