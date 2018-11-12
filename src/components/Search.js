import React from 'react';
import Page from './Page';
import { object, func, bool } from 'prop-types';
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField,
  Typography,
  MenuItem
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { types, sestieri, createArtifact } from '../artifact';
import { asyncIterator, iterator } from 'lazy-iters';
import withArtifactDialog from './withArtifactDialog';
import { queryGroupsAsync } from '../data';

function styles(theme) {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
      overflowX: 'auto'
    },
    controls: {
      padding: theme.spacing.unit
    },
    table: {
      tableLayout: 'fixed'
    },
    pagination: {
      float: 'right'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      width: 160
    },
    numberField: {
      marginLeft: theme.spacing.unit,
      width: 120
    },
    loading: {
      width: '100%',
      padding: 100
    },
    clearButton: {
      float: 'right'
    }
  };
}

const rowsPerPage = 5;

const defaultFilter = {
  name: '',
  type: 'Any',
  sestiere: 'Any',
  height: '',
  tolerance: 0
};

function Load(props) {
  const { loaded = true, children } = props;
  const newChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      disabled: !loaded
    })
  );
  return <React.Fragment>{newChildren}</React.Fragment>;
}

Load.propTypes = {
  loaded: bool
};

class Search extends React.Component {
  state = {
    data: [],
    loaded: false,
    page: 0,
    rowsPerPage,
    search: defaultFilter,
    activeFilter: defaultFilter
  };

  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    const iter = asyncIterator(queryGroupsAsync());
    const data = await iter.map(createArtifact).collect();
    this.setState({
      ...this.state,
      loaded: true,
      data
    });
  }

  handleChangeSearchName = event => {
    const { search } = this.state;
    const name = event.target.value;
    this.setState({
      ...this.state,
      search: {
        ...search,
        name
      }
    });
  };

  handleChangeSearchType = event => {
    const { search } = this.state;
    const type = event.target.value;
    this.setState({
      ...this.state,
      search: {
        ...search,
        type
      }
    });
  };

  handleChangeSearchSestiere = event => {
    const { search } = this.state;
    const sestiere = event.target.value;
    this.setState({
      ...this.state,
      search: {
        ...search,
        sestiere
      }
    });
  };

  handleChangeSearchHeight = event => {
    const { search } = this.state;
    const value = event.target.value;
    const height = value.length > 0 ? Number.parseFloat(event.target.value) : value;
    this.setState({
      ...this.state,
      search: {
        ...search,
        height
      }
    });
  };

  handleChangeSearchTolerance = event => {
    const { search } = this.state;
    const value = event.target.value;
    const tolerance = value.length > 0 ? Number.parseFloat(event.target.value) : value;
    this.setState({
      ...this.state,
      search: {
        ...search,
        tolerance
      }
    });
  };

  handleSearch = () => {
    const { search } = this.state;
    this.setState({
      ...this.state,
      activeFilter: search
    });
  };

  handleClear = () => {
    this.setState({
      ...this.state,
      search: defaultFilter,
      activeFilter: defaultFilter
    });
  };

  handleChangePage = (_, page) => {
    this.setState({
      ...this.state,
      page
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      ...this.state,
      rowsPerPage: event.target.value
    });
  };

  filterArtifacts() {
    const { data, search } = this.state;
    const { name, type, sestiere, height, tolerance } = search;
    const filterName = name.length == 0;
    const filterType = type.length == 0 || type === 'Any';
    const filterSestiere = sestiere.length == 0 || sestiere === 'Any';
    const filterHeight = !(typeof height == 'number' && typeof tolerance == 'number');
    console.log(search);
    const searchName = name.toLowerCase();
    const searchType = type.toLowerCase();
    const searchSestiere = sestiere.toLowerCase();
    return iterator(data)
      .filter(({ name }) => filterName || name.toLowerCase().indexOf(searchName) >= 0)
      .filter(({ type }) => filterType || type.toLowerCase() === searchType)
      .filter(({ sestiere }) => filterSestiere || sestiere.toLowerCase() === searchSestiere)
      .filter(({ heightCM }) => filterHeight || Math.abs(heightCM - height) <= tolerance);
  }

  render() {
    const { classes, onArtifactClick } = this.props;
    const { page, rowsPerPage, loaded, data } = this.state;
    const filteredArtifacts = this.filterArtifacts().collect();
    const renderedArtifacts = iterator(filteredArtifacts)
      .skip(page * rowsPerPage)
      .take(rowsPerPage)
      .map(artifact => {
        const { id, name, type, sestiere } = artifact;
        return (
          <TableRow hover tabIndex={-1} key={id} onClick={onArtifactClick(artifact)}>
            <TableCell>{name}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>{sestiere}</TableCell>
          </TableRow>
        );
      })
      .collect();
    return (
      <Page selected="search">
        <Paper className={classes.root}>
          <div className={classes.controls}>
            <Load loaded={loaded}>
              <TextField
                // disabled={!loaded}
                margin="dense"
                onChange={this.handleChangeSearchName}
                value={this.state.search.name}
                className={classes.textField}
                label="Name"
              />
              <TextField
                margin="dense"
                select
                label="Type"
                value={this.state.search.type}
                onChange={this.handleChangeSearchType}
                className={classes.textField}
                placeholder="Type"
              >
                <MenuItem key="Any" value="Any">
                  Any
                </MenuItem>
                {types.map(group => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                select
                label="Sestiere"
                value={this.state.search.sestiere}
                onChange={this.handleChangeSearchSestiere}
                className={classes.textField}
                placeholder="Type"
              >
                <MenuItem key="Any" value="Any">
                  Any
                </MenuItem>
                {sestieri.map(group => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                onChange={this.handleChangeSearchHeight}
                value={this.state.search.height}
                type="number"
                className={classes.numberField}
                label="Height (cm)"
              />
              {/* <TextField
                  margin="dense"
                  // disabled={!loaded}
                  onChange={this.handleChangeSearchTolerance}
                  value={this.state.search.tolerance}
                  type="number"
                  className={classes.numberField}
                  label="Tolerance (cm)"
                /> */}
              <Button onClick={this.handleClear} color="primary" className={classes.clearButton}>
                Clear
              </Button>
            </Load>
          </div>
          <Table className={classes.table} padding="dense">
            <TableHead>
              <TableRow>
                <TableCell width="50%">Artifact</TableCell>
                <TableCell with="25%">Type</TableCell>
                <TableCell with="25%">Sestiere</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loaded ? (
                renderedArtifacts
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography align="center" variant="button" className={classes.loading}>
                      Loading
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredArtifacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            className={classes.pagination}
          />
        </Paper>
      </Page>
    );
  }
}

Search.propTypes = {
  classes: object.isRequired,
  onArtifactClick: func.isRequired
};

export default withStyles(styles)(withArtifactDialog(Search));
