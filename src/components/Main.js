
function Main() {
    return (
        <main>
            <div className="convert-container">
                <div>
                    <div className="rss-selection">
                        <label id="selectLabel">Select</label>
                        <select id="rss_url" name="cars" required>
                            <option defaultValue="https://www.sustainable-investment.com/rss_v2/feeds" data-site="SI">
                                SI RSS feed</option>
                            <option defaultValue="https://www.investmentiq.co.uk/feeds/rss/pensions" data-site="IQ">IQ RSS Pensions
                                feed</option>
                            <option defaultValue="https://www.investmentiq.co.uk/feeds/rss/financial-advice" data-site="IQ">IQ RSS
                                Financial Advice
                                feed
                            </option>
                            <option defaultValue="https://www.investmentiq.co.uk/feeds/rss/investment-management" data-site="IQ">IQ
                                RSS
                                Investment
                                Management feed</option>
                        </select>
                    </div>
                    <div className="number-selection">
                        <label id="numberLabel">Number of Articles</label>
                        <input id="numberOfTitles" type="number" defaultValue="1" min="1" max="10" required/>
                    </div>
                </div>
                <button id="convert">Convert</button>
            </div>

            <div className="content-container">
                <div id="feed-container">
                    <div id="rss-feed"></div>
                </div>
                <div className="button-container">
                    <button id="copy">Copy</button>
                    <button id="clear">Clear</button>
                </div>
            </div>

        </main>
    )
}

export default Main;