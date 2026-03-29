#!/bin/sh
# Run from frankapp/ after editing ../places.js or ../intentHintsVocab.js at App Dev root.
set -e
cd "$(dirname "$0")"
cp ../places.js docs/places.js
cp ../intentHintsVocab.js docs/intentHintsVocab.js
echo "Synced places.js + intentHintsVocab.js into docs/. Commit and push frankapp repo to deploy."
