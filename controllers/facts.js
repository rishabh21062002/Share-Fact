import Fact from "../models/facts.js";
// let list = [];

export const createFact = async (req, res) => {
  try {
    const { factText, factSource, factCategory } = req.body;
    const fact = new Fact({
      factText,
      source: factSource,
      category: factCategory,
    });

    await fact.save();
    // list.append(fact);

    res.redirect("/");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFact = async (req, res) => {
  try {
    let hastag = "All";
    const { category } = req.query;
    if (category) {
      hastag = category;
      // console.log("asdfasf");
    }

    let facts;
    if (hastag != "All") {
      facts = await Fact.find({ category: hastag });

      // list = facts;
    } else {
      // console.log(hastag);
      facts = await Fact.find();
      // console.log(facts);

      // list = facts;
    }
    // facts = await Fact.find();
    // console.log(facts);
    res.render("index", { list: facts });
    // res.status(200).json(facts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFact = async (req, res) => {
  try {
    const { factId } = req.query;
    const { numLikes } = req.body;

    const fact = await Fact.findById(factId);

    fact.numOfLikes[0] = numLikes[0];
    fact.numOfLikes[1] = numLikes[1];
    fact.numOfLikes[2] = numLikes[2];

    if (
      numLikes[0] + numLikes[1] + 12 < numLikes[2] ||
      numLikes[2] / (numLikes[0] + numLikes[1] + 1) >= 8
    ) {
      console.log();
      fact.disputed = true;
    } else {
      fact.disputed = false;
    }

    const updatedFact = await Fact.findByIdAndUpdate(
      factId,
      { numOfLikes: fact.numOfLikes, disputed: fact.disputed },
      { new: true }
    );

    res.status(200).json(updatedFact);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
