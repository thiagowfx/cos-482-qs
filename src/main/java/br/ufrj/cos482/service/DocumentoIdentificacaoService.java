package br.ufrj.cos482.service;

import br.ufrj.cos482.service.dto.DocumentoIdentificacaoDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing DocumentoIdentificacao.
 */
public interface DocumentoIdentificacaoService {

    /**
     * Save a documentoIdentificacao.
     *
     * @param documentoIdentificacaoDTO the entity to save
     * @return the persisted entity
     */
    DocumentoIdentificacaoDTO save(DocumentoIdentificacaoDTO documentoIdentificacaoDTO);

    /**
     *  Get all the documentoIdentificacaos.
     *  
     *  @return the list of entities
     */
    List<DocumentoIdentificacaoDTO> findAll();

    /**
     *  Get the "id" documentoIdentificacao.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    DocumentoIdentificacaoDTO findOne(Long id);

    /**
     *  Delete the "id" documentoIdentificacao.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
