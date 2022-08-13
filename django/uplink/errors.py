class Error(Exception):
    pass


class ParamsMismatchException (Error):
    def __init__(self, msg):
        self.msg = "MISMATCH_PARAMS\n" + msg
        self.status = 200


class DuplicateDataException (Error):
    def __init__(self, msg):
        self.msg = "DUPLICATE_DATA\n" + msg
        self.status = 200
