import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { green, red, blue } from "@material-ui/core/colors";

import colors from "src/palette";

export const useStyles = makeStyles({
  buttonWrapper: {
    marginTop: "15px",
  },
  gridSpacer: {
    marginTop: "15px",
  },
  greenIcon: {
    color: green[500],
  },
  redIcon: {
    color: red[500],
  },
  blueIcon: {
    color: blue[500],
  },
  tableContainer: {
    marginTop: "10px",
  },
  paginationWrapper: {
    border: "solid thin lightGrey",
  },
  listLink: {
    color: colors.primaryColor,
  },
  statusCell: {
    textAlign: "center",
    padding: 0,
  },
  deleteCell: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  titleCell: {
    fontWeight: 600,
  },
  closeButton: {
    float: "right",
    color: colors.grey[800],
    backgroundColor: colors.normalGrey,
    top: 0,
    right: 0,
  },
  cardItem: {
    margin: 0,
    padding: 0,
  },
  cardNoBorder: {
    border: "none",
    margin: 0,
    padding: 0,
  },
  imageCard: {
    margin: 0,
    padding: 0,
  },
  imageCardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  tagsChips: {
    margin: "2px",
    padding: 0,
  },
  tableChip: {
    border: "none",
  },
  addConventionImage: {
    width: "300px",
    height: "220px",
    cursor: "pointer",
  },
  fileInput: {
    visibility: "hidden",
    width: 0,
  },
});

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      paddingRight: 5,
    },
  }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

export const useImageStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    cardHeader: {
      "& .MuiCardHeader-content": {
        paddingRight: "20px",
      },
      alignSelf: "center",
      "& .MuiCardHeader-action": {
        alignSelf: "center",
      },
    },
    buttonWrapper: {
      marginTop: "15px",
    },
    tattooItemWrapper: {
      display: "flex",
      padding: "20px",
      border: "none",
    },
    chips: {
      margin: "2px",
      padding: 0,
    },
  }),
);
