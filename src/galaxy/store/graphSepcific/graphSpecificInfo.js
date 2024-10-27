export default graphSpecificInfo;

function graphSpecificInfo(graphName) {
  switch(graphName) {
    case 'pupsichek':
      return new PackagesGraph(graphName);
  }
  return new DefaultGraph(graphName);
}

function DefaultGraph(graphName) {
  this.graphName = graphName;
  this.getInDegreeLabel = function getInDegreeLabel(inDegreeValue) {
    return '';
  };

  this.getOutDegreeLabel = function getInDegreeLabel(outDegreeValue) {
    return '';
  };
}

function PackagesGraph(graphName) {
  DefaultGraph.call(this, graphName);

  this.getInDegreeLabel = function getInDegreeLabel(inDegreeValue) {
    return inDegreeValue === 1 ? '' : '';
  };

  this.getOutDegreeLabel = function getInDegreeLabel(outDegreeValue) {
    return outDegreeValue === 1 ? '' : '';
  };
}

function GoGraph(graphName) {
  PackagesGraph.call(this, graphName);
}

function FollowersGraph(graphName) {
  DefaultGraph.call(this, graphName);

  this.getInDegreeLabel = function getInDegreeLabel(inDegreeValue) {
    return inDegreeValue === 1 ? 'follower' : 'followers';
  };

  this.getOutDegreeLabel = function getInDegreeLabel(outDegreeValue) {
    return 'following';
  };
}
