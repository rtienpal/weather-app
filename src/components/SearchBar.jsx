import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import React from "react"

export default function SearchBar({
  placeholder,
  data,
  fetchApi,
  setCityTwoStatus,
  cityTwoStatus,
  setCityTwo,
}) {
  const [filteredData, setFilteredData] = React.useState([])
  const [searchWord, setSearchWord] = React.useState("")
  const [chosenCity, setChosenCity] = React.useState([{
    apiCityId: "recife,pe",
  }])

  async function updateCity(chosenCity) {
    setCityTwoStatus("pending")
    const newCityTwo = await fetchApi(chosenCity)
    setCityTwo(newCityTwo)
    setCityTwoStatus("resolved")
  }

  React.useEffect(() => {
    if (cityTwoStatus === "pending") {
    updateCity(chosenCity)
  }
  }, [chosenCity])

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setSearchWord(searchWord)
    let newFilter = []
    if (searchWord) {
      newFilter = data.filter((city) => {
        return city.nome.toLowerCase().includes(searchWord.toLowerCase())
      })
    }
    setFilteredData(newFilter)
  }
  function clearSearchWord() {
    setFilteredData([])
    setSearchWord("")
  }
  return (
    <form>
      <div className="searchInputs">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
          name="cidade"
          value={searchWord}
        ></input>
        <div className="searchIcon">
          {searchWord ? (
            <CloseIcon id="closeBtn" onClick={clearSearchWord} />
          ) : (
            <SearchIcon />
          )}
        </div>
      </div>
      {filteredData.length > 0 && (
        <div className="dataResults">
          {filteredData.slice(0, 15).map((city, key) => {
            return (
              <div
                className="dataResult"
                key={key}
                onClick={() => {
                  setCityTwoStatus("pending")
                  setChosenCity({
                    apiCityId: city.apiCityId,
                  })
                  updateCity(chosenCity)

                  // setChosenCity(city.apiCityId)
                  // handleClickCity()
                  // clearSearchWord()
                }}
              >
                {`${city.nome} - ${city.estado}`}
              </div>
            )
          })}
        </div>
      )}
    </form>
  )
}
