package br.ufrj.cos482.service.mapper;

import br.ufrj.cos482.domain.*;
import br.ufrj.cos482.service.dto.DocumentoSistemaDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity DocumentoSistema and its DTO DocumentoSistemaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DocumentoSistemaMapper {

    DocumentoSistemaDTO documentoSistemaToDocumentoSistemaDTO(DocumentoSistema documentoSistema);

    List<DocumentoSistemaDTO> documentoSistemasToDocumentoSistemaDTOs(List<DocumentoSistema> documentoSistemas);

    DocumentoSistema documentoSistemaDTOToDocumentoSistema(DocumentoSistemaDTO documentoSistemaDTO);

    List<DocumentoSistema> documentoSistemaDTOsToDocumentoSistemas(List<DocumentoSistemaDTO> documentoSistemaDTOs);
}
