import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetchDataQuery } from "src/features/RestaurantLayoutApi";

function mySvg(id, index) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" x="0px" y="0px">
      <g data-name="Round table">
        <path
          fill={index >= 5 ? "red" : null}
          d="M62,20C62,11.028,48.822,4,32,4S2,11.028,2,20c0,8.431,11.638,15.144,27,15.923V47.756l-9.777,9.777a1,1,0,0,0,0,1.414l2.83,2.83a1,1,0,0,0,1.414,0L31.244,54h1.512l7.777,7.777a1,1,0,0,0,1.414,0l2.83-2.83a1,1,0,0,0,0-1.414L35,47.756V35.923C50.362,35.144,62,28.431,62,20ZM4,20C4,12.28,16.561,6,32,6s28,6.28,28,14S47.439,34,32,34,4,27.72,4,20ZM33.017,48.083a.983.983,0,0,0,.276.794l9.363,9.363L41.24,59.656l-7.363-7.363a.983.983,0,0,0-.794-.276A.717.717,0,0,0,33,52H31a.717.717,0,0,0-.083.017.983.983,0,0,0-.794.276L22.76,59.656,21.344,58.24l9.363-9.363a.983.983,0,0,0,.276-.794A.717.717,0,0,0,31,48V35.987c.333,0,1.667,0,2,0V48A.717.717,0,0,0,33.017,48.083Z"
        />
      </g>
      <text
        x="10"
        y="23"
        fill="#000000"
        font-size="13px"
        font-weight="bold"
        font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      >
        {id}
      </text>
      {/* <text
      x="0"
      y="84"
      fill="#000000"
      font-size="5px"
      font-weight="bold"
      font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
    >
      from the Noun Project
    </text> */}
    </svg>
  );
}

const TableLayout = () => {
  //Redux Toolkit Queries ile ilgili state ler
  const { data, isLoading, isError } = useFetchDataQuery();

  //Redux Toolkit query durumları
  if (isLoading) {
    return <div>İşlem Yapılıyor...</div>;
  }

  if (isError) {
    return <div>Hata Oluştu</div>;
  }

  return (
    <Container>
      <Row>
        <h2>Masalar</h2>
      </Row>
      <Row>
        {data.data.map((item) => (
          <div className="restaurant_layout_section">
            <h4>{item.sectionName}</h4>
            <Row key={item.id}>
              {[...Array(item.tableCount)].map((_, index) => (
                <Col xs={4} sm={3} md={2} lg={1} key={index}>
                  {/* <div className="table">
                    <div>{`${index + 1}`}</div>
                  </div> */}
                  {mySvg(`${item.sectionName.slice(0, 3)} ${index + 1}`, index)}
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default TableLayout;
